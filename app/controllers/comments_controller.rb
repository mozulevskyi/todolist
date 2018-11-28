class CommentsController < ApplicationController

  def context
    { current_task: current_task}
  end

  def current_project
    @current_project ||= current_user.projects.find(params[:project_id])
  end

  def current_task
    @current_task ||= current_project.tasks.find(params[:task_id])
  end

end
