class TaskResource < JSONAPI::Resource
  attributes :name, :done, :deadline
  has_one :project
  has_many :comments
end
