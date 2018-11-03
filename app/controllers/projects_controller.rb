class ProjectsController < ApplicationController

  def index
    @projects = Project.order('created_at DESC')
    render json: @projects
  end

  def create
    @project = Project.create(project_params)
    render json: @project
  end

  def show
    @project = current_project
    render json: {
        project: @project,
        tasks: @project.tasks || []
    }.to_json
  end

  def update
    current_project.update(project_params)
    render json: current_project
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    head :no_content
  end

  private

  def project_params
    params.require(:project).permit(:title)
  end

  def current_project
    @project = Project.find(params[:id])
  end
end
