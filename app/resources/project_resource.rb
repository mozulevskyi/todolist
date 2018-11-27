class ProjectResource < JSONAPI::Resource
  attributes :title
  has_many :tasks
end