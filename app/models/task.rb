class Task < ApplicationRecord 
    validates :name, :status, :description , presence: true
end