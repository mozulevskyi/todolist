require 'rubygems'
require 'simplecov'
SimpleCov.start 'rails'
require 'factory_bot_rails'
# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Capybara Settings
Capybara.configure do |config|
  config.javascript_driver = :selenium
  config.run_server = true
  config.default_selector = :css
  config.default_max_wait_time = 10

  #capybara 2.1 config options
  config.match = :prefer_exact
  config.ignore_hidden_elements = false
end

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

# Rspec Settings
RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  #config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = "ans"
  config.infer_spec_type_from_file_location!
  config.expect_with(:rspec) { |c| c.syntax = [:should, :expect] }
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do |example|
    DatabaseCleaner.strategy = example.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.after(:context) do
    FileUtils.rm_rf("#{Rails.root}/tmp/uploads/test")
    FileUtils.rm_rf("#{Rails.public_path}/uploads/test")
  end

  # Adding helpful rspec stuff for devise functionality testing
  # config.include Devise::Test::ControllerHelpers, type: :controller

  # Capybara stuff
  config.include Rails.application.routes.url_helpers
  config.include Capybara::DSL

  #Include Factory bot syntax to simplify calls to factories
  config.include FactoryBot::Syntax::Methods
  config.include ActionDispatch::TestProcess

  config.include ActionView::Helpers::TextHelper

  config.include(Shoulda::Matchers::ActiveModel, type: :model)
  config.include(Shoulda::Matchers::ActiveRecord, type: :model)

  config.before(:each) { ActionMailer::Base.deliveries.clear }

  # Use color in STDOUT
  config.color = true

  # Use color not only in STDOUT but also in pagers and files
  config.tty = true

  # Use the specified formatter
  config.formatter = :documentation # :progress, :html,
  # :json, CustomFormatterClass

  # Adding helpful rspec stuff for devise functionality testing
  config.include Devise::Test::ControllerHelpers, type: :controller
end