class ProjectResource < JSONAPI::Resource
  attributes :title
  has_many :tasks
  has_one :user
  before_save do
    @model.user_id = context[:current_user].id if @model.new_record?
  end

  def self.records(options = {})
    context = options[:context]
    context[:current_user].projects
  end
end