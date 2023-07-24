class TaskController < ApplicationController 

    def index
        all_tasks = Task.includes(:users, :tags).all
        render json: all_tasks, include: [:users, :tags]
    end


    def show 
        got_email = params[:email] + '.com'
        p got_email
        user = User.find_by(email:got_email)
        user_tasks = user.tasks

        p user_tasks

        all_data = []

        user_tasks.each {
            |task|
            obj = {}
            t = Task.find(task.id)
            employee = t.users
            obj[:id] = t.id
            obj[:status] = t.status 
            obj[:name] = t.name 
            obj[:deadline] = t.deadline 
            obj[:description] = t.description 
            emp = []
            employee.each {
                |e|
                emp.append(e)
            }
            obj[:users] = emp 
            tags = []
            all_tags = t.tags 
            all_tags.each {
                |tag|
                tags.append(tag)
            }
            obj[:tags] = tags

            all_data.append(obj)
        }
        render json:all_data
    end

    def create 
        data = params[:task_data]
        task_name = data[:name]  
        task_desc = data[:description] 
        deadline = data[:date] 

        new_task = Task.create!(name:task_name,description:task_desc,deadline:deadline)

        employees = data[:employees]
        employees.each {
            |employee| 
            new_task.users << User.find_by(email:employee)
        }

        tags = data[:tags]
        tags.each {
            |tag| 
            new_task.tags << Tag.find_by(name:tag)
        }

    end

    def destroy 
        id = params[:id]
        Task.destroy(id)
    end

    def update_status 
        # p '((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))'
        status = params[:status]
        id = params[:id]

        task = Task.find(id)

        if status == 'pending'
            task.status = 'completed'
        else 
            task.status = 'pending'
        end

        task.save()

    end




end