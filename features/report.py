from lettuce import *

@step('I see data table')
def I_see_data_table(step):
    driver = world.browser

@step('I click on Generate PDF button')
def I_click_on_Generate_PDF_button(step):
    driver = world.browser
    driver.find_element_by_id("pdfgen").click()


@step('I click on Generate XML button')
def I_click_on_Generate_XML_button(step):
    driver = world.browser
    driver.find_element_by_id("xmlgen").click()

