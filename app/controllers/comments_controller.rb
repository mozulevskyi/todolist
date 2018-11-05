class CommentsController < ApplicationController

  api :GET, '/projects/:id/tasks/:id/comments', 'List of all task`s comments in json format'
  def index
    @comments = current_task.comments.order('created_at ASC')
    render json: @comments
  end

  api :POST, '/projects/:id/tasks/:id/comments', 'Create comment for specific project'
  def create
    @comment = current_task.comments.create!(comments_params)
    render json: @comment
  end

  api :PUT, '/projects/:id/tasks/:id/comments/:id', 'Update current comment for specific task'
  def update
    current_comment.update_attributes(comments_params)
    render json: current_comment
  end

  api :DELETE, '/projects/:id/tasks/:id/comments/:id', 'Delete current existing comment'
  def destroy
    current_comment.destroy
    head :no_content
  end

  private

  def current_task
    @task = Task.find(params[:task_id])
  end

  def current_comment
    @comment = current_task.comments.find(params[:id])
  end

  def comments_params
    params.require(:comment).permit(:body)
  end


end
