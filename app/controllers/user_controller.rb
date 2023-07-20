class UserController < ApplicationController 

    
    def all_users 
        user = User.all 
        render json: user
    end

end
