class ProjectsController < ApplicationController
  load_and_authorize_resource

  def context
    {current_user: current_user}
  end
end
