require 'spec_helper'

RSpec.describe Comment, type: :model do
  # Association test
  it { should belong_to(:task) }
end
