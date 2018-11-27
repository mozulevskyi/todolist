class ApplicationController < JSONAPI::ResourceController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def context
    {current_user: current_user}
  end
end
