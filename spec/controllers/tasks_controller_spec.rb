require 'spec_helper'

RSpec.describe TasksController, type: :controller do
  let!(:project) { FactoryBot.create(:project) }
  let!(:task) { FactoryBot.create(:task, project_id: project.id, name: 'Task one') }

  describe 'GET list of all tasks' do
    it 'returns status code 200' do
      get :index, params: {project_id: project.id}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
    end
  end

  describe 'POST create a new task' do
    it 'returns status code 200' do
      task_params = {
          name: 'Task one',
          done: false,
          deadline: nil
      }
      post :create, params: {project_id: project.id, task: task_params}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['name']).to eq(task.name)
    end
  end

  describe 'PUT create a new task' do
    it 'returns status code 200' do
      task_params = {
          name: 'Task one updated',
          done: false,
          deadline: nil
      }
      put :update, params: {project_id: project.id, id: task.id, task: task_params}
      task.reload
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(task.id)
    end
  end

  describe 'DELETE current task' do
    it 'returns status code 204' do
      delete :destroy, params: {project_id: project.id, id: task.id}
      expect(response).to have_http_status(204)
    end
  end

end
