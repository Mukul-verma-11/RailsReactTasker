# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # def create
  #   render json: { message: "hit" }
  # end

  private


  def respond_with(resources, options={})
    if resources.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully', data: resources }
      }, status: :ok 
    else
      render json: {
        status: { message: 'User could not be created successfull', errors: resources.errors.full_messages }, status: :unprocessable_entity
      }
    end
  end
end