class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :value
end
