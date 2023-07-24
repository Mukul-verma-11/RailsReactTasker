class Task < ApplicationRecord 
    has_and_belongs_to_many :users 
    has_and_belongs_to_many :tags

    validates :name, :status, :description , presence: true

end