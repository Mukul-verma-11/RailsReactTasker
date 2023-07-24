class TagController < ApplicationController 

    def all_tags
        tags = Tag.all 
        render json: tags
    end

    

end