'use strict';

module.exports = {
    AdminStoresService: require('./admin_stores_service'),
    AdminSuppliersService: require('./admin_suppliers_service'),
    AdminEmployesService: require('./admin_employes_service'),
    AdminCustomersService: require('./admin_customers_service'),
    AdminMinCurrencyService: require('./admin_min_currency_service'),
    AdminTaxService: require('./admin_taxes_service'),
    AdminReceiptTemplatesService: require('./admin_receipt_templates_service'),
    AdminZonesService: require('./admin_time_zones_service'),
    AdminCountriesService: require('./admin_coutries_service'),
    AdminAccountSettingService: require('./admin_account_setting_service'),
    AdminCurrencyService: require('./admin_currency_service'),
    AdminCurrencyNotesService: require('./admin_currency_notes_service'),
    AdminCategoriesService: require('./admin_categories_service'),
    AdminMeasurementService: require('./admin_unit_of_measurement_service'),
    AdminDeliveryCompaniesService: require('./admin_third_party_companies_service'),
    AdminTagService: require('./admin_tag_service'),
    AdminPrinterService: require('./admin_printers_service'),
    AdminProdTagService: require('./admin_prod_tag_service'),
    AdminProductService: require('./admin_products_service'),
    AdminPriceBookService: require('./admin_price_book_service'),
    AdminIpadLayoutService: require('./admin_ipad_layout_service'),
    AdminPromotionService: require('./admin_promotions_service'),
    AdminPurchaseService: require('./admin_purchase_service'),
    AdminControlOprationService: require('./admin_control_opration_service'),
    AdminStockReturnService: require('./admin_stock_return_service'),
    AdminStockTransferService: require('./admin_stock_transfer_service'),
    AdminItemLedgerService: require('./admin_item_ledger_service'),
    AdminInventoryService: require('./admin_inventory_service'),
    AdminAdsService: require('./admin_ads_service'),
    AdminAccountTransactionService: require('./admin_account_transaction_service'),
    AdminStockReceiveService: require('./admin_stock_receive_service'),
    AdminWebReportsService: require('./admin_web_reports_service'),

    //mobile services
    MobileLoginService: require('./mobile-services/login_service'),
    MobileSaleMasterService: require('./mobile-services/sale_master_service'),
    MobileDashboardService: require('./mobile-services/dashboard_service'),
    MobileAttendanceService: require('./mobile-services/attendance_service'),
    MobileShiftService: require('./mobile-services/shift_service'),
    MobileListAllService: require('./mobile-services/list_all_service'),
    MobileReportService: require('./mobile-services/reports_service'),

    //users services
    UsersAuthorizationService: require('./users-authorization'),

};

