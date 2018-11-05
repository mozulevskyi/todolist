class ProjectsController < ApplicationController

  api :GET, '/projects', 'List of all projects in json format'
  def index
    @projects = current_user.projects.order('created_at DESC')
    render json: @projects
  end

  api :POST, '/projects', 'Create a new project'
  def create
    @project = current_user.projects.create(project_params)
    render json: @project
  end

  api :PUT, '/projects/:id', 'Update existing project'
  def update
    current_project.update(project_params)
    render json: current_project
  end

  api :DELETE, '/projects/:id', 'Delete existing project'
  def destroy
    current_project.destroy
    head :no_content
  end

  private

  def project_params
    params.require(:project).permit(:title)
  end

  def current_project
    @project = current_user.projects.find(params[:id])
  end
end
