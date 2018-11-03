class CommentsController < ApplicationController

  def index
    @comments = current_task.comments.order('created_at ASC')
    render json: @comments
  end

  def create
    @task = current_task
    @comment = @task.comments.create!(comments_params)
    render json: @comment
  end

  def update
    @task = current_task
    current_comment.update_attributes(comments_params)
    render json: current_comment
  end

  def destroy
    current_comment.destroy
    head :no_content
  end

  private

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
