class UserController < ApplicationController 


    def create
        user = User.all 
        p '8****************************'
        # a = param[:task_data][:employees]
        # emp = param
        p '8**************************** '

    end

    def all_users 
        user = User.all 

        p '8**************************** '
        render json: user
    end

    

end
