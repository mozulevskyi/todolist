class ProjectsController < ApplicationController

  def context
    {current_user: current_user}
  end
end
