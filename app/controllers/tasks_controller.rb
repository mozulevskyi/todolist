class TasksController < ApplicationController

  def index
    @tasks = current_project.tasks.order('created_at DESC')
    render json: @tasks
  end

  def create
    @task = Task.create(task_params.merge(project_id: current_project.id))
    render json: @task
  end

  def update
    @project = current_project
    current_task.update_attributes(task_params)
    head :no_content
  end

  def destroy
    current_task.destroy
    head :no_content
  end

  private

  def current_project
    @project = Project.find(params[:project_id])
  end

  def current_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :done)
  end

end
