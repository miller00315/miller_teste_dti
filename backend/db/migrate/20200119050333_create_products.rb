class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.text :name
      t.integer :quantity
      t.float :value

      t.timestamps
    end
  end
end
