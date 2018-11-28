class CommentResource < JSONAPI::Resource
  attributes :body
  has_one :task

  def self.records(options = {})
    context = options[:context]
    context[:current_task].comments
  end
end