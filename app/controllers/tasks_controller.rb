class TasksController < ApplicationController

  api :GET, '/projects/:id/tasks', 'List of all project`s tasks in json format'
  def index
    @tasks = current_project.tasks.order('created_at DESC')
    render json: @tasks
  end

  api :POST, '/projects/:id/tasks', 'Create task for specific project'
  def create
    @task = current_project.tasks.create(task_params)
    render json: @task
  end

  api :PUT, '/projects/:id/tasks/:id', 'Update current task for specific project'
  def update
    if can?(:manage, Task)
      current_task.update_attributes(task_params)
      render json: current_task
    else
      render json: {}, status: 401
    end
  end

  api :DELETE, '/projects/:id/tasks/:id', 'Delete current existing task'
  def destroy
    if can?(:manage, Task)
      current_task.destroy
      head :no_content
    else
      render json: {}, status: 401
    end
  end

  private

  def current_project
    @project = Project.find(params[:project_id])
  end

  def current_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :done, :deadline)
  end

end
