from rest_framework import serializers
from .models import Order, Cart

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  
    product = serializers.StringRelatedField() 
    
    class Meta:
        model = Order
        fields = ['user', 'product', 'quantity', 'total_price', 'date_ordered']


class CartItemSerializer(serializers.ModelSerializer):
    
    total_price = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['product', 'quantity', 'total_price', 'product_image']

    def get_total_price(self, obj):
        return obj.product.price * obj.quantity
    
    def get_image(self, obj):
        # Return the product image URL
        return obj.product.image.url if obj.product.image else None