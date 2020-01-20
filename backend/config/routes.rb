Rails.application.routes.draw do
  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'
  put '/products/:id', to: 'products#update'
  post '/products', to: 'products#create'
  delete '/products/:id', to: 'products#destroy'  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
