# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create 
    session = params[:session]
    user = session[:user]
    email = user[:email]

    user = User.find_for_database_authentication(email: email && params[:session][:user][:email])
    if invalid_password?(user)
      respond_with_error 'Incorrect email or password', 401
    else
      sign_in(user)
      p "))))))))))))))))))))))"
      p user 
      p "))))))))))))))))))))))"
      render json: {
        status: 200,
        role: user[:role],
        email: user[:email],
        message: "email is valid"
      }, status: :created
    end


  end

  private

  def invalid_password?(user)
    user.blank? || !user.valid_password?(params[:session][:user][:password])
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], 
    Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload['sub'])
    if current_user
      render json: {
        status: 200,
        message: "Signed out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "User has no active session"
      }, status: :unauthorized
    end
  end
end