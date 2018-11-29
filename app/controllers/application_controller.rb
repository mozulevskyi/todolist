class ApplicationController < JSONAPI::ResourceController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  private

  def current_ability
    @current_ability ||= Ability.new(current_user)
  end
end
