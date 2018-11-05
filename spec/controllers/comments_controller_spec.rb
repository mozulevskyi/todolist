require 'spec_helper'

RSpec.describe CommentsController, type: :controller do

  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project, user_id: user.id) }
  let!(:task) { FactoryBot.create(:task, project_id: project.id) }
  let!(:comment) { FactoryBot.create(:comment, task_id: task.id, body: 'First comment') }

  before :each do
    sign_in(user)
  end

  describe 'GET list of all comments' do
    it 'returns status code 200' do
      get :index, params: {project_id: project.id, task_id: task.id}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
    end
  end

  describe 'POST create a new comment' do
    it 'returns status code 200' do
      comment_params = {
          body: 'First comment'
      }
      post :create, params: {project_id: project.id, task_id: task.id, comment: comment_params}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['body']).to eq(comment.body)
    end
  end

  describe 'PUT update current comment' do
    it 'returns status code 200' do
      comment_params = {
          body: 'First comment updated'
      }
      put :update, params: {project_id: project.id, task_id: task.id, id: comment.id, comment: comment_params}
      comment.reload
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(comment.id)
    end
  end

  describe 'DELETE current comment' do
    it 'returns status code 204' do
      delete :destroy, params: {project_id: project.id, task_id: task.id, id: comment.id}
      expect(response).to have_http_status(204)
    end
  end

end
