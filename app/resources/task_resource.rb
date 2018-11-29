class TaskResource < JSONAPI::Resource
  attributes :name, :done, :deadline
  has_one :project
  has_many :comments

  def self.records(options = {})
    context = options[:context]
    context[:current_project].tasks
  end
end
