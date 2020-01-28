class TasksController < ApplicationController

  def context
    {current_user: current_user, current_project: current_project}
  end

  def current_project
    @current_project ||= current_user.projects.find(params[:project_id])
  end

end
