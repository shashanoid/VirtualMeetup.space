Rails.application.routes.draw do
  post 'room/create', to: 'room#create'
  get '/room/info/:room_id', to: 'room#get_room'
  get '/room/get_current_user_rooms', to: 'room#get_all_rooms'
  get '/meet' ,to: "room#show"
  #User management

  # Google auth
  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')

  get 'homepage', to: 'homepage#index', as: 'homepage'
  get 'userinfo' => 'homepage#get_user'



  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
