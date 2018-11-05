require 'spec_helper'

RSpec.describe ProjectsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project, title: 'Hello', user_id: user.id) }

  before :each do
    sign_in(user)
  end

  describe 'GET list of all projects' do
    it 'returns status code 200' do
      get :index
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
    end
  end

  describe 'POST a new project' do
    it 'returns status code 200' do
      project_params = {title: 'Hello'}

      post :create, params: {project: project_params}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['title']).to eq(project_params[:title])
    end
  end

  describe 'PUT update a current project' do
    it 'returns status code 200' do
      put :update, params: {id: project.id, project: {title: 'Hello hello'} }
      project.reload
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(project.id)
    end
    end

  describe 'DELETE current project' do
    it 'returns status code 204' do
      delete :destroy, params: {id: project.id}
      expect(response).to have_http_status(204)
    end
  end

end
