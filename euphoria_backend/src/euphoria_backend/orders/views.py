from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Product, Order, Cart
from rest_framework.permissions import IsAuthenticated

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            user = request.user
            quantity = request.data.get('quantity', 1)  

            # Check if quantity is within the available stock
            if quantity <= 0 or quantity > product.stock:
                return Response({
                    'status': 'error',
                    'message': f'Cannot add more than {product.stock} items to the cart.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Start a transaction for adding to cart
            with transaction.atomic():
                cart_item, created = Cart.objects.get_or_create(user=user, product=product)
                if not created:
                    cart_item.quantity += quantity
                    cart_item.save()

            return Response({
                'status': 'success',
                'message': f'{product.name} added to cart. Quantity: {cart_item.quantity}.',
            }, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'status': 'error', 'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


class BuyNowView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            user = request.user
            quantity = request.data.get('quantity', 1)  

            # Check if the requested quantity is available in stock
            if quantity <= 0 or quantity > product.stock:
                return Response({
                    'status': 'error',
                    'message': f'Insufficient stock. Available: {product.stock}.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Start a transaction for the purchase
            with transaction.atomic():
                # Reduce stock
                product.stock -= quantity
                product.save()

                # Create the order
                total_price = product.price * quantity
                Order.objects.create(
                    user=user,
                    product=product,
                    quantity=quantity,
                    total_price=total_price
                )
                
                cart_item = Cart.objects.filter(user=user, product=product).first()
                if cart_item:
                    cart_item.delete()  

            return Response({
                'status': 'success',
                'message': f'You bought {quantity} {product.name}.',
            }, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'status': 'error', 'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch cart items for the logged-in user
        cart_items = Cart.objects.filter(user=request.user)

        # Check if the cart is empty
        if not cart_items.exists():
            return Response({'message': 'Your cart is empty.'}, status=status.HTTP_200_OK)

        # Serialize the cart items (we can create a simple serializer for cart items)
        cart_data = [{
            'product_name': item.product.name,
            'quantity': item.quantity,
            'price': item.product.price,
            'total_price': item.quantity * item.product.price,
        } for item in cart_items]

        return Response({
            'cart_items': cart_data,
        }, status=status.HTTP_200_OK)