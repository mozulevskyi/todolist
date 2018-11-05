require 'spec_helper'

RSpec.describe Project, type: :model do
  # Association test
  it { should have_many(:tasks).dependent(:destroy) }
end
