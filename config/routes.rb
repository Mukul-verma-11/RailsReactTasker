Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # get 'all_users', to: 'user#all_users'


  match "*path", to: "home#index", via: :all

end
