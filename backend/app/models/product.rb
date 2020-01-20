class Product < ApplicationRecord
	validates :name, presence: true
	validates :quantity, presence: true
	validates :value, presence: true
end
