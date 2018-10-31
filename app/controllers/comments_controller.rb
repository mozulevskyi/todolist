class CommentsController < ApplicationController

  before_action :current_project

  before_action :current_task

  def index
    @comments = current_task.comments.order('created_at DESC')
    render json: @comments
  end

  def create
    @comment = Comment.create(comments_params.merge(task_id: current_task.id))
    render json: @comment
  end

  def update
    current_comment.update_attributes(comments_params)
    head :no_content
  end

  def destroy
    current_comment.destroy
    head :no_content
  end

  private

  def current_project
    @project = Project.find(params[:project_id])
  end

  def current_task
    @task = Task.find(params[:task_id])
  end

  def current_comment
    @comment = Comment.find(params[:id])
  end

  def comments_params
    params.require(:comment).permit(:body)
  end


end
