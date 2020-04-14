Rails.application.routes.draw do
  # Event routes
  get 'event/create_event'
  post 'event/create'


  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
