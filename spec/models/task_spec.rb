require 'spec_helper'

RSpec.describe Task, type: :model do
  # Association test
  it { should belong_to(:project) }
  it { should have_many(:comments).dependent(:destroy) }
end
