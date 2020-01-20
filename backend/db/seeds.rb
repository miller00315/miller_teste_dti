# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Product.destroy_all

puts 'Criando produtos'

Product.create(id: 0, name: 'Mesa', quantity: 10, value: 50.5)
Product.create(id: 1, name: 'Cadeira', quantity: 8, value: 60.5)
