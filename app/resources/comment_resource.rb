class CommentResource < JSONAPI::Resource
  attributes :body
  has_one :task
end