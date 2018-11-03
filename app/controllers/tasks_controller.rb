class TasksController < ApplicationController

  before_action :current_project

  def index
    @tasks = current_project.tasks.order('created_at DESC')
    render json: @tasks
  end

  def create
    @task = @project.tasks.create!(task_params)
    render json: @task
  end

  def update
    @project = current_project
    current_task.update_attributes(task_params)
    render json: current_task
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
