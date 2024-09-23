<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test task</title>
    @vite('resources/css/app.css')
</head>
<body class="font-sans antialiased dark:bg-black dark:text-white/50">
@vite('resources/js/app.js')
<div id="app-page">
    <div id="app-content">
        <div class="page-layout">
            <div class="page-layout-content">
                <div class="container-fluid">
                    <div class="page-layout-header">
                        <h1 class="page-layout-title">Orders</h1>
                        <p class="page-layout-subtitle">information about orders and customers</p>
                    </div>
                    <div class="page-layout-section">
                        <div class="card">
                            <div class="index-table-wrapper">
                                <div class="index-table-header">
                                    <div class="index-table-header-filter">
                                        <div class="col-left">
                                            <div class="form-select">
                                                <select id="filter-select">
                                                    <option value="all" selected>All</option>
                                                    @foreach($fulfillment_statuses as $key => $fulfillment_status)
                                                        <option value="{{$fulfillment_status}}">{{$fulfillment_status}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-right">
                                            <button id="import" class="btn mr-0">Import</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="index-table-inner">
                                    <table class="index-table">
                                        <thead>
                                        <tr>
                                            <th>Customer name</th>
                                            <th>Customer email</th>
                                            <th>Total price</th>
                                            <th>Financial status</th>
                                            <th>Fulfillment status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="index-table-footer">
                                    <div class="table-result">Showing <span class="items-per-page">0</span> of <span class="total-items">0</span> results</div>
                                    <div class="button-group">
                                        <a href="#" class="btn btn btn-icon btn-no-label prev" disabled>
                                          <span class="btn-icon-holder">
                                            <svg viewBox="0 0 20 20" class="Icon_Icon__Dm3QW" style="width: 20px; height: 20px;"><path d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414l-4.293 4.293 4.293 4.293a.999.999 0 0 1-.707 1.707z"></path></svg>
                                          </span>
                                            prev
                                        </a>
                                        <a href="#" class="btn btn btn-icon btn-no-label next" disabled>
                                          <span class="btn-icon-holder">
                                            <svg viewBox="0 0 20 20" class="Icon_Icon__Dm3QW" style="width: 20px; height: 20px;"><path d="M8 16a.999.999 0 0 1-.707-1.707l4.293-4.293-4.293-4.293a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5a.997.997 0 0 1-.707.293z"></path></svg>
                                          </span>
                                            next
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
