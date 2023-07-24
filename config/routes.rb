Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :tasks
  get 'all_users', to: 'user#all_users'
  get 'all_tags', to: 'tag#all_tags'
  post 'create_tasks', to: 'task#create'

  get 'all_tasks', to: 'task#index'
  get 'task/:email', to: 'task#show'

  delete 'delete_task/:id', to: 'task#destroy'
  put 'task_status/:id' , to:'task#update_status'

  match "*path", to: "home#index", via: :all

end
