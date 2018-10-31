require 'spec_helper'

RSpec.describe TasksController, type: :controller do
  let!(:project) { FactoryBot.create(:project) }
  let!(:items) { FactoryBot.create(:task, project_id: project.id) }

  describe 'GET list of all tasks' do
    context 'when project exists' do
      it 'returns status code 200' do
        get :index, params
        expect(response).to have_http_status(200)
        json = JSON.parse(response.body)
        expect(json.size).to eq(1)
      end
    end
  end

end
