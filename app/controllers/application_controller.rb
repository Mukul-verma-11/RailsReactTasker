class ApplicationController < ActionController::Base
    # skip_before_action :verify_authenticity_token

    def authenticated 
        

        # if params[:session]
        # session = params[:session]
        # user = session[:user]
        # email = user[:email]

        # user = User.find_for_database_authentication(email: email && params[:session][:user][:email])

        p '88888>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
        puts 'user'
        p request.headers["Authorization"]
        p '88888>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

        # else 
        #     p 'logout'
        # end

    
    # if invalid_password?(user)
    #   respond_with_error 'Incorrect email or password', 401
    # else
    #   all_user = User.all 
    #   p all_user
    # end

    end

end
