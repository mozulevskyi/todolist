require 'cancan/matchers'

describe Ability do
  describe "abilities of loggined user" do
    subject { ability }

    let(:ability){ Ability.new(user) }
    let(:user){ FactoryBot.create(:user) }
    let(:project){ FactoryBot.create(:project, user: user) }
    let(:task){ FactoryBot.create(:task, project_id: project.id) }
    let(:comment){ FactoryBot.create(:comment, task_id: task.id) }

    context 'for projects' do
      it { expect(ability).to be_able_to(:read, project) }
      it { expect(ability).to be_able_to(:create, Project) }
      it { expect(ability).to be_able_to(:update, project) }
      it { expect(ability).to be_able_to(:destroy, project) }
      end

    context 'for tasks' do
      it { expect(ability).to be_able_to(:read, task) }
      it { expect(ability).to be_able_to(:create, Task) }
      it { expect(ability).to be_able_to(:update, task) }
      it { expect(ability).to be_able_to(:destroy, task) }
      end

    context 'for tasks' do
      it { expect(ability).to be_able_to(:read, comment) }
      it { expect(ability).to be_able_to(:create, Comment) }
      it { expect(ability).to be_able_to(:update, comment) }
      it { expect(ability).to be_able_to(:destroy, comment) }
    end
  end
end