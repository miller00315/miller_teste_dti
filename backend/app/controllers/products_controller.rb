class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @products = Product.all.order(:name)
    render json: @products
  end
 
  def create
    product = Product.new(product_params)
    if product.save
      render json: product, status: :created
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end


  def show
    if @product.present?
      render json: @product
    else
      render status: :no_content
    end
  end

  def update
    if @product.present?
      @product.update_attributes(product_params)
      render json: @product
   else
      render status: :no_content

    end	
  end

  def destroy
    if @product.present?
      @product.destroy
      render status: :ok
    else 
      render status: :no_content
    end
  end

  private

    def set_product
      if Product.exists?(params[:id])
      	@product = Product.find(params[:id])
      end
    end

    def product_params
	params.require(:product).permit(:name, :quantity, :value)
    end
end
