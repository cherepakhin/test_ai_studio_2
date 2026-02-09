
package com.elevatehr.client.view;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.uibinder.client.UiHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.*;

public class VacancyView extends Composite {

    interface VacancyViewUiBinder extends UiBinder<Widget, VacancyView> {}
    private static VacancyViewUiBinder uiBinder = GWT.create(VacancyViewUiBinder.class);

    @UiField TextBox titleBox;
    @UiField TextBox companyBox;
    @UiField TextArea descriptionArea;
    @UiField Button submitButton;
    @UiField VerticalPanel listPanel;

    public VacancyView() {
        initWidget(uiBinder.createAndBindUi(this));
    }

    @UiHandler("submitButton")
    void handleClick(ClickEvent e) {
        Window.alert("Vacancy " + titleBox.getText() + " registered successfully via GWT!");
    }
}
